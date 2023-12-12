import { Directive, ElementRef, Injector, Input, SimpleChanges, effect } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BusyService } from '../services/busy.service';

@Directive({
    selector: '[appDisableDuringSubmit]',
    standalone: true,
})
export class DisableDuringSubmitDirective {

    private ngUnsubscribe: Subject<any> = new Subject();

    @Input() formValid: any;

    constructor(private _busyService: BusyService, private el: ElementRef, private injector: Injector) {
    }
    ngOnInit() {
        this.doChecks();
    }
    ngOnChanges(changes: SimpleChanges) {
        this.doChecks();
    }

    checkFormValidation(form: any) {
        if ((form.valid == true)) {
            this.checkAjaxProgress();
        }
        if ((form.valid == false)) {
            this.el.nativeElement.disabled = true;
        }
    }

    checkAjaxProgress() {
        effect(() => {
            const response = this._busyService.busy$();
            if ((response == true)) {
                this.el.nativeElement.disabled = true;
            }
            if ((response == false)) {
                this.el.nativeElement.disabled = false;
            }
            // Check form one more time
            if ((this.formValid != null)) {
                if ((this.formValid.valid == false)) {
                    this.el.nativeElement.disabled = true;
                }
            }
        }, {injector: this.injector});

    }

    doChecks() {
        // If there is no form to check validation then just check the ajax progress
        if ((this.formValid == null)) {
            this.checkAjaxProgress();
        }
        // Else check the forms validation AND ajax progress
        else {
            this.checkFormValidation(this.formValid);
            this.formValid.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: any) => this.checkFormValidation(this.formValid));
        }
    }
}
