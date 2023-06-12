import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

import { UtilsService } from '../../core/services/utils.service';
import { PostService } from '../../core/services/post.service';
import { DownloadLinkPipe } from '../pipes/download-link.pipe';
import { Picture } from '../../core/models/media';
import { Post } from '../../core/models/post';

@Component({
  selector: 'bk-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  @Input() post: Post | undefined;
  isPlayerReady = false;
  waveSurfer: any;
  pictureAlt = '';
  playing = false;

  constructor(
    private postService: PostService,
    private utilsService: UtilsService,
    private downloadLinkPipe: DownloadLinkPipe,
  ) { }

  ngOnInit(): void {
    this.pictureAlt = this.postService.generateFullName(this.post);

    this.waveSurfer = WaveSurfer.create({
      container: '#waveform',
      barWidth: 3,
      height: 70,
      barRadius: 2,
      normalize: false,
    });
    
    this.waveSurfer.load(this.downloadLinkPipe.transform(this.firstAudio?.original));

    this.waveSurfer.on('ready', () => {
      this.isPlayerReady = true;
    });
  }

  get firstPicture(): Picture | undefined {
    return this.post?.pictures[0];
  }

  get firstAudio(): Picture | undefined {
    return this.post?.audios[0];
  }

  get userFullName() {
    return this.utilsService.getFullName(this.post?.user);
  }

  togglePlay() {
    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
  }

  play(): void {
    if (!this.isPlayerReady) {
      return;
    }
    this.playing = true;
    this.waveSurfer.play();
  }

  pause() {
    this.playing = false;
    this.waveSurfer.pause();
  }
}

