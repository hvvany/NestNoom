import { Controller, Get, Render } from "@nestjs/common";

@Controller("facetime")
export class CamFrontEndController {
  @Get()
  @Render("index")
  root() {
    return { message: "Hello world!" };
  }
}
