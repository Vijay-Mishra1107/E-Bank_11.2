import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AppLoaderService } from "../../../shared/services/app-loader/app-loader.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class landingComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private router: Router,
    private loder: AppLoaderService,
  ) {
    localStorage.clear();
  }

  singnupPage() {
    this.loder.open();
    setTimeout(() => {
      this.loder.close();
      this.router.navigateByUrl('sessions/signup');
    }, 1500);
  }
  signinPage() {
    this.loder.open();
    setTimeout(() => {
      this.loder.close();
      this.router.navigateByUrl('sessions/signin');
    }, 1500);
  }

  openNav() {
    document.getElementById("sidenav").style.width = "45%";
  }
  closeNav() {
    document.getElementById("sidenav").style.width = "0%";
  }

  ngOnInit() { }

  ngAfterViewInit() { }

  ngOnDestroy() {
    localStorage.clear();
  }
}
