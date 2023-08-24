import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stripe-congratulation',
  templateUrl: './stripe-congratulation.component.html',
  styleUrls: ['./stripe-congratulation.component.scss']
})
export class StripeCongratulationComponent implements OnInit {

    public stripe?;
  
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
      this.stripe = this.route.snapshot.paramMap.get('stripe');
    }
  
    ngOnInit(){
      this.stripe = this.route.snapshot.paramMap.get('stripe');
      (this.stripe === "standard" || this.stripe === "smart" || this.stripe === "genius")
      ? alert(`Félicitation pour l'acquisition de votre ${this.capitalizer(this.stripe)} Pack\nPensez à vous reconnecter`)
      : console.log("ERROR");
      console.log(this.stripe);
      return this.router.navigateByUrl("");
    }
  
    capitalizer(stripe: string | null){
      if(!stripe){return;}
      stripe = stripe[0].toUpperCase() + stripe.slice(1).toLowerCase();
      return stripe;
    }
  }
  