import { Component, EventEmitter, Output } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Lesson } from '../../models/lesson';
import { EditLessonComponent } from '../edit-lesson/edit-lesson.component';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-lessons',
  imports: [EditLessonComponent, HeaderComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css',
})
export class LessonsComponent {
  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) {}
  list: Lesson[] = [];
  messesge!: string;
  @Output() id: EventEmitter<number> = new EventEmitter<number>();
  currentIdForEdit!: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('courseId')); // ממיר את ה-ID למספר
      if (!id) return;
      this.coursesService.getLessonsById(id).subscribe((lessons) => {
        this.list = lessons;
      });
    });
  }

  edit(courseId: number, id: number) {
    this.currentIdForEdit = id;
    this.messesge = '';
    // this.route.navigate([`/courses/:${Course.id}`])
  }
  delete(courseId: number, id: number) {
    this.coursesService.deleteLesson(courseId, id).subscribe({
      next: (response) => {
        console.log('success delete');
        this.list = this.list.filter((lesson) => lesson.id !== id);
      },
      error: (err) => {
        if (err.status === 403) {
          console.log('you cannt delete');
        } else {
          console.error('שגיאה בעדכון הקורס:', err);
        }
      },
    });
  }
  canChange = () => {
    let role =
      typeof window !== 'undefined' && typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('role')
        : null;
    if (role == 'student') return false;
    return true;
  };
  save(e: any) {
    this.coursesService.updateLesson(e.courseId, e.id, e).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.currentIdForEdit = -1;
        this.coursesService.getLessonsById(e.courseId).subscribe((lessons) => {
          this.list = lessons;
        });
      },
      error: (err) => {
        if (err.status === 403) {
          this.messesge = 'אין לך הרשאה לעדכן את הקורס.';
        } else {
          this.messesge = 'שגיאה בעדכון הקורס:';
        }
      },
    });
  }
}
