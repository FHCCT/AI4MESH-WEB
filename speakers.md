---
layout: default
title: Speakers
nav_key: speakers
---

<section class="content-panel" aria-labelledby="speakers-title">
  <h2 class="panel-title" id="speakers-title">Speakers</h2>
  <div class="panel-body prose">
    <ul class="plain-list" id="speaker-directory">
      {% for speaker in site.data.speakers %}
      {% assign speaker_url = '/speakers/' | append: speaker.id | append: '/' %}
      <li id="{{ speaker.id }}"><a class="standard-link" href="{{ speaker_url | relative_url }}">{{ speaker.name | escape }}</a> — {{ speaker.institution | escape }}</li>
      {% endfor %}
    </ul>
  </div>
</section>
