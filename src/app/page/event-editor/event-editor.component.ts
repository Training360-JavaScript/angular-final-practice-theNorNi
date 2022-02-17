import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  event: Event = new Event();

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
     switchMap(params => this.eventService.get(params['id']))).subscribe(
        evt => this.event = evt
    );
  }

  onUpdate(form: NgForm): void {
    this.eventService.update(
      {id: this.event.id, name: form.value.name, date: form.value.date, time: form.value.time, location: form.value.location}
      ).subscribe(
        () => this.router.navigate(['/'])
      );
  }
}
