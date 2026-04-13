import { UsersService } from './../users/users.service';

import { ConfigService } from '@nestjs/config';



import { Injectable, OnModuleInit } from '@nestjs/common';



import { InjectModel } from '@nestjs/mongoose';



import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';



import {

    Permission,

    PermissionDocument,

} from '../permissions/schemas/permission.schema';



import { Role, RoleDocument } from '../roles/schemas/role.schema';



import { User, UserDocument } from '../users/schemas/user.schema';



@Injectable()

export class DatabasesService implements OnModuleInit {

    constructor(

        @InjectModel(User.name)

        private userModel: SoftDeleteModel<UserDocument>,



        @InjectModel(Permission.name)

        private permissionModel: SoftDeleteModel<PermissionDocument>,



        @InjectModel(Role.name)

        private roleModel: SoftDeleteModel<RoleDocument>,



        private configService: ConfigService,

        private usersService: UsersService,

    ) { }



    onModuleInit() {

        console.log('The module has been initialized.');

    }

}

