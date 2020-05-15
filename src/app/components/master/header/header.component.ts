import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Actor } from 'src/app/models/actor.model';
import { Router, ActivatedRoute } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  faGlobe = faGlobe;
  private home: String;
  private activeRole: String;
  private currentActor: Actor;
  private userLoggedIn: boolean;

  constructor(private authService: AuthService, private translateService: TranslateService, 
    private ngZone: NgZone, private router: Router, private route: ActivatedRoute) {
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
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.currentActor = this.authService.getCurrentActor();
        this.activeRole = this.authService.getCurrentActorRole();
      } else {
        this.activeRole = 'anonymous';
        this.currentActor = null;
      }
    });
    if(this.currentActor == null){
      this.currentActor = this.authService.getCurrentActor();
      if(this.currentActor != null){
        this.activeRole = this.currentActor.role[0].toString();
      }
    }

    const component = this;
    let headerHome, headerTrips, headerTripsList, headerTripsNew, headerLogin, headerLogout, headerRegister, headerLanguage,
    headerSponsorships, headerSponsorshipsList, headerSponsorshipsNew, myProfile, adminOptions, adminActorsList, adminDashboard,
    adminActorCreate, audits, finder, applications, myTrips;
    this.translateService.stream('header.home').subscribe((text:string) => {headerHome = text});
    this.translateService.stream('trips.trips').subscribe((text:string) => {headerTrips = text});
    this.translateService.stream('trips.list').subscribe((text:string) => {headerTripsList = text});
    this.translateService.stream('trips.new').subscribe((text:string) => {headerTripsNew = text});
    this.translateService.stream('sponsorships.sponsorships').subscribe((text:string) => {headerSponsorships = text});
    this.translateService.stream('sponsorships.list').subscribe((text:string) => {headerSponsorshipsList = text});
    this.translateService.stream('sponsorships.new').subscribe((text:string) => {headerSponsorshipsNew = text});
    this.translateService.stream('actor.profile').subscribe((text:string) => {myProfile = text});
    this.translateService.stream('header.login').subscribe((text:string) => {headerLogin = text});
    this.translateService.stream('header.logout').subscribe((text:string) => {headerLogout = text});
    this.translateService.stream('header.register').subscribe((text:string) => {headerRegister = text});
    this.translateService.stream('header.language').subscribe((text:string) => {headerLanguage = text});
    this.translateService.stream('actor.admin.options').subscribe((text:string) => {adminOptions = text});
    this.translateService.stream('actor.list').subscribe((text:string) => {adminActorsList = text});
    this.translateService.stream('dashboard.display').subscribe((text:string) => {adminDashboard = text});
    this.translateService.stream('actor.create.new').subscribe((text:string) => {adminActorCreate = text});
    this.translateService.stream('audits.audits').subscribe((text:string) => {audits = text});
    this.translateService.stream('finder.finder').subscribe((text:string) => {finder = text});
    this.translateService.stream('applications.list').subscribe((text:string) => {applications = text});
    this.translateService.stream('trips.myCreated').subscribe((text:string) => {myTrips = text});

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
        $('.mobile-nav #header-sponsorships2').html(headerSponsorships);
        $('.mobile-nav #header-sponsorships-list2').html(headerSponsorshipsList);
        $('.mobile-nav #header-sponsorships-new2').html(headerSponsorshipsNew);
        //$('.mobile-nav #header-login').html(headerLogin);
        $('.mobile-nav #header-profile2').html(myProfile);
        $('.mobile-nav #header-login2').html(headerLogin);
        //$('.mobile-nav #header-logout').html(headerLogout);
        $('.mobile-nav #header-logout2').html(headerLogout);
        $('.mobile-nav #header-register2').html(headerRegister);
        $('.mobile-nav #header-language').html(headerLanguage);
        $('.mobile-nav #header-admin-options2').html(adminOptions);
        $('.mobile-nav #header-admin-actors-list2').html(adminActorsList);
        $('.mobile-nav #header-admin-dashboard-display2').html(adminDashboard);
        $('.mobile-nav #header-admin-actor-create2').html(adminActorCreate);
        $('.mobile-nav #header-audit-list2').html(audits);
        $('.mobile-nav #header-finder-edit2').html(finder);
        $('.mobile-nav #header-applications-list2').html(applications);
        $('.mobile-nav #header-trips-new2').html(myTrips);
        if(component.currentActor == null) {
          console.log('El actor principal es null');
          $('.mobile-nav #header-register2-li').removeAttr('hidden');
          $('.mobile-nav #header-login2-li').removeAttr('hidden');
        } else {
          $('.mobile-nav #header-register2-li').hide();
          $('.mobile-nav #header-login2-li').hide();

          $('.mobile-nav #header-logout2-li').removeAttr('hidden');
          $('.mobile-nav #header-profile2-li').removeAttr('hidden');
          $('.mobile-nav #header-profile2').attr('href', '/actors/display/'+component.currentActor._id);

          if (component.activeRole == 'MANAGER') {
            $('.mobile-nav #header-applications-list2-li').removeAttr('hidden');
            $('.mobile-nav #header-applications-list2').attr('href', '/actors/'+component.currentActor._id+'/applications');

            $('.mobile-nav #header-trips-new2-li').removeAttr('hidden');

          } else if (component.activeRole === 'ADMINISTRATOR') {
            $('.mobile-nav #header-admin-options2-li').removeAttr('hidden');
          } else if (component.activeRole === 'EXPLORER') {
            $('.mobile-nav #header-finder-edit2-li').removeAttr('hidden');

            $('.mobile-nav #header-applications-list2-li').removeAttr('hidden');
            $('.mobile-nav #header-applications-list2').attr('href', '/actors/'+component.currentActor._id+'/applications');

          } else if (component.activeRole === 'SPONSOR') {
            $('.mobile-nav #header-sponsorships2-li').removeAttr('hidden');

          } else if (component.activeRole === 'AUDITOR') {
            $('.mobile-nav #header-audit-list2-li').removeAttr('hidden');

          }
        }
      });
      $(document).on('click', '.mobile-nav #changeLangEn', function() {
        component.changeLanguageEn();
        location.reload();
      });
      $(document).on('click', '.mobile-nav #changeLangEs', function() {
        component.changeLanguageEs();
        location.reload();
      });
      $(document).on('click', '.mobile-nav #header-logout2', function() {
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
      this.activeRole = 'anonymous';
      this.currentActor = null;
      this.router.navigate(['/']);
    }).catch(error => {
      console.log(error);
    });
  }

}
