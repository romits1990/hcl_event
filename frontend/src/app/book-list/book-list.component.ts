import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookModel } from '../models/book-model';
import { BookService } from '../services/book.service';
import {FormControl} from '@angular/forms';

import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  bookList: BookModel[];

  @ViewChild('bookSearch', { static: true }) movieSearchInput: ElementRef;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe((data: BookModel[]) => {
      this.bookList = data;
    },
    (error) => {
      alert("Error happened");
    });
  }

}
