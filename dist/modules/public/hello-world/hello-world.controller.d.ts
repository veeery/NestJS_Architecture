import { HelloWorldService } from './hello-world.service';
export declare class HelloWorldController {
    private readonly hantu;
    constructor(hantu: HelloWorldService);
    helloWorld(): Promise<string>;
}
