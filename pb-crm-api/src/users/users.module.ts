import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {UserTypeEntity} from "../entities/user-type.entity";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: []
})
export class UsersModule {}