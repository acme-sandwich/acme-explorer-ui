import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  faGlobe = faGlobe;
  private home: String;


  constructor(private authService: AuthService, private translateService: TranslateService, private ngZone: NgZone) {
    super(translateService);
    this.translateService.get('header.home').subscribe((text:string) => {this.home = text});
   }

   changeLanguage(language: string) {
     super.changeLanguage(language);
   }

   changeLanguageEn(){
     super.changeLanguage('en');
   }
   changeLanguageEs(){
     super.changeLanguage('es');
   }

  ngOnInit() {
    const component = this;
    let headerHome, headerTrips, headerTripsList, headerTripsNew, headerLogin, headerLogout, headerRegister, headerLanguage,
    headerSponsorships, headerSponsorshipsList, headerSponsorshipsNew;
    this.translateService.stream('header.home').subscribe((text:string) => {headerHome = text});
    this.translateService.stream('trips.trips').subscribe((text:string) => {headerTrips = text});
    this.translateService.stream('trips.list').subscribe((text:string) => {headerTripsList = text});
    this.translateService.stream('trips.new').subscribe((text:string) => {headerTripsNew = text});
    this.translateService.stream('sponsorships.sponsorships').subscribe((text:string) => {headerSponsorships = text});
    this.translateService.stream('sponsorships.list').subscribe((text:string) => {headerSponsorshipsList = text});
    this.translateService.stream('sponsorships.new').subscribe((text:string) => {headerSponsorshipsNew = text});
    this.translateService.stream('header.login').subscribe((text:string) => {headerLogin = text});
    this.translateService.stream('header.logout').subscribe((text:string) => {headerLogout = text});
    this.translateService.stream('header.register').subscribe((text:string) => {headerRegister = text});
    this.translateService.stream('header.language').subscribe((text:string) => {headerLanguage = text});

    if ($('.nav-menu').length) {
      const $mobile_nav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none'
      });
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');
      $(document).on('click', '.mobile-nav-toggle', function(e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').toggle();
        $('.mobile-nav #header-home').html(headerHome);
        $('.mobile-nav #header-trips').html(headerTrips);
        $('.mobile-nav #header-trips-list').html(headerTripsList);
        $('.mobile-nav #header-trips-new').html(headerTripsNew);
        $('.mobile-nav #header-sponsorships').html(headerSponsorships);
        $('.mobile-nav #header-sponsorships-list').html(headerSponsorshipsList);
        $('.mobile-nav #header-sponsorships-new').html(headerSponsorshipsNew);
        $('.mobile-nav #header-login').html(headerLogin);
        $('.mobile-nav #header-logout').html(headerLogout);
        $('.mobile-nav #header-register').html(headerRegister);
        $('.mobile-nav #header-language').html(headerLanguage);
      });
      $(document).on('click', '.mobile-nav #changeLangEn', function() {
        component.changeLanguageEn();
        location.reload();
      });
      $(document).on('click', '.mobile-nav #changeLangEs', function() {
        component.changeLanguageEs();
        location.reload();
      });
      $(document).on('click', '.mobile-nav #header-logout', function() {
        component.logout();
        location.reload();
      });
      $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
        e.preventDefault();
        $(this).next().slideToggle(300);
        $(this).parent().toggleClass('active');
      });
      $(document).click(function(e) {
        const container = $('.mobile-nav, .mobile-nav-toggle');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
        }
      });
    } else if ($('.mobile-nav, .mobile-nav-toggle').length) {
      $('.mobile-nav, .mobile-nav-toggle').hide();
    }

    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 1000
    });

    $('.skills-content').waypoint(function() {
      $('.progress .progress-bar').each(function() {
        $(this).css('width', $(this).attr('aria-valuenow') + '%');
      });
    }, {
      offset: '80%'
    });

    $('.clients-carousel').owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      responsive: {
        0: {
          items: 2
        },
        768: {
          items: 4
        },
        900: {
          items: 6
        }
      }
    });

    $('.portfolio-details-carousel').owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
    });

  }

  logout() {
    this.authService.logout()
    .then(_ => {
      console.log('Logging out...');
    }).catch(error => {
      console.log(error);
    });
  }

}
