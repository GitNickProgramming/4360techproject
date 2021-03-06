import {Injectable} from '@nestjs/common';
import {
    AddressCategory,
    AddressDTO,
    CreateContactRequest,
    CSVColumns,
    CSVExportModel, EmailCategory,
    EmailDTO,
    PhoneCategory,
    PhoneDTO, WebpageCategory,
    WebpageDTO,
} from '@hiddentemple/api-interfaces';
import fs from "fs";
import csv from 'csv-parse';

const { Parser, transforms: { unwind } } = require('json2csv');


@Injectable()
export class UploadService {
  
  async contactParse(filename: string): Promise<any>{
    let fileDir = './files/'
    let results = []
    let uploadService: UploadService = new UploadService();
    let contactList: CreateContactRequest[] = [];
    
    return new Promise(function(resolve, reject){
      fs.createReadStream(fileDir + filename)
        .pipe((csv({ columns: CSVColumns }))
        .on('data', async (row) => {
          if (row.FirstName != 'First Name') {
            results.push(row);
          }
        })
        .on('end', () => {
          contactList = uploadService.setContacts(results)
          resolve(contactList)
        })
        )}
    );
  }
  
 setContacts(results: any[]): any {
    let contactList: CreateContactRequest[] = []
    results.forEach((record) => {
      let {contact}: CreateContactRequest = {contact: {
          firstName: record.FirstName,
          lastName: record.LastName,
          nickName: record.Nickname,
          jobTitle: record.JobTitle,
          department: record.Department,
          organization: record.Organization,
          notes: record.Notes,
          birthday:  record.Birthday,
          anniversary:  record.Anniversary,
          gender:  record.Gender,
          tags:  record.Categories.split(','),
          phones: this.parsePhones(record),
          emails: this.parseEmails(record),
          addresses: this.parseAddresses(record),
          webpages: this.parseWebpages(record)
        }
      }
      contactList.push({contact});
    });
    return contactList;
  }
  
  parsePhones(record: any): any {
    let phones: PhoneDTO[] = []
    const keys = Object.keys(record);
    for (const key of keys) {
      if (key.includes('Phone')) {
        if (record[key]) {
          const phone: PhoneDTO = new PhoneDTO();
          phone.phoneNumber = record[key].replace(/-/g, '');
          switch (key) {
            case 'HomePhone': {
              phone.category = PhoneCategory.HOME
              break;
            }
            case 'BusinessPhone': {
              phone.category = PhoneCategory.WORK
              break;
            }
            case 'MobilePhone': {
              phone.category = PhoneCategory.MOBILE
              phone.isPrimary = true
              break;
            }
            case 'BusinessFax':
              phone.category = PhoneCategory.BUSINESS_FAX
              break
            case 'HomeFax': {
              phone.category = PhoneCategory.HOME_FAX
              break;
            }
          }
          phones.push(phone)
        }
      }
    }
    return phones;
  }


  parseEmails(record: any): any{
    let emails: EmailDTO[] = []
    const keys = Object.keys(record);
    keys.forEach(key => {
      if (key.includes('Email')) {
        const email: EmailDTO = new EmailDTO();
        if (record[key]) {
          email.address = record[key];
          if (key.valueOf() === 'EmailAddress') {
            email.category = EmailCategory.OTHER;
            email.isPrimary = true;
          } else if (key.includes('2')) {
            email.category = EmailCategory.OTHER;
          } else if (key.includes('3')) {
            email.category = EmailCategory.OTHER;
          }
          emails.push(email);
        }
      }
    });
    return emails;
  }


  parseWebpages(record: any): any{
    let webpages: WebpageDTO[] = []
    const keys = Object.keys(record);
    keys.forEach(key => {
      if(key.includes('WebPage')){
        const webpage: WebpageDTO = new WebpageDTO();
        if(record[key]){
          webpage.url = record[key];
          if(key.valueOf() === 'WebPage') {
            webpage.category = WebpageCategory.PERSONAL;
          }
          if(key.valueOf() === 'WebPage2') {
            webpage.category = WebpageCategory.BUSINESS;
          }
          webpages.push(webpage);
        }
      }
    });
    return webpages;
  }


  parseAddresses(record: any): any{
    const homeAddress: AddressDTO = new AddressDTO();
    const businessAddress: AddressDTO = new AddressDTO();
    const addresses: AddressDTO[] = [];

    if(record.HomeAddress) {
      homeAddress.street = record.HomeAddress;
      if (record.HomeAddress2) {
        homeAddress.street2 = record.HomeAddress2;
      }
      homeAddress.city = record.HomeCity;
      homeAddress.state = record.HomeState;
      homeAddress.postalCode = record.HomePostalCode;
      if (record.HomeCountry) {
        homeAddress.country = record.HomeCountry
      }
      homeAddress.category = AddressCategory.HOME;
      addresses.push(homeAddress)
    }
    if(record.BusinessAddress) {
      businessAddress.street = record.BusinessAddress;
      if(record.BusinessAddress2){
        businessAddress.street2 = record.BusinessAddress2;
      }
      businessAddress.city  = record.BusinessCity;
      businessAddress.state = record.BusinessState;
      businessAddress.postalCode = record.BusinessPostalCode;
      if(record.BusinessCountry){
        businessAddress.country = record.BusinessCountry;
      }
      businessAddress.category = AddressCategory.BUSINESS;
      
      addresses.push(businessAddress)
    }
    return addresses;
  }
  
  
  //TODO export models here
  static parseJson2Csv(jsonData: any) {
    const fields = CSVExportModel;
    const transforms = [unwind({ paths: ['phones', 'emails'], blankOut: true })];
    const json2csvParser = new Parser({ fields, transforms });
    const csv = json2csvParser.parse(jsonData, null, null);
    console.log(csv);
    return csv;
  }
  
}
