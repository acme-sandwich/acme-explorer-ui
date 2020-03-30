import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private translateService: TranslateService) {
    super(translateService);
   }

   changeLanguage(language: string) {
     super.changeLanguage(language);
   }

  ngOnInit() {
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
