import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'lesson/:courseId',
    renderMode: RenderMode.Server, // Prevents prerendering issues
  },
  { path: 'addlesson/:courseId', renderMode: RenderMode.Server },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
