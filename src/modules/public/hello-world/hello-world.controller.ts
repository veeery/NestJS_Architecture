import { Controller, Get, Post, Body, Patch, ParseIntPipe, Param, Delete, Query } from '@nestjs/common';
import { HelloWorldService } from './hello-world.service';

@Controller({path: 'hello-world'})
export class HelloWorldController {
    constructor(private readonly hantu: HelloWorldService) {}

    @Get()
    helloWorld() {
        return this.hantu.helloWorld()
    }
}