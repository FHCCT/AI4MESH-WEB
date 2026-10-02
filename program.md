---
layout: default
title: Program
nav_key: program
---

<section class="content-panel" aria-labelledby="program-title">
  <h2 class="panel-title" id="program-title">Program</h2>
  <div class="panel-body prose">
    <p>The workshop takes place on {{ site.data.conference.date_display }}.</p>
    <table class="program-table" aria-labelledby="program-title">
      <thead><tr><th scope="col">Time</th><th scope="col">Talk title</th><th scope="col">Author</th></tr></thead>
      <tbody>
        {% for speaker in site.data.speakers %}
        {% assign speaker_url = '/speakers/' | append: speaker.id | append: '/' %}
        <tr>
          <td></td>
          <td>{% if speaker.talk_title %}{{ speaker.talk_title | escape }}{% if speaker.talk_tentative %} (tentative){% endif %}{% endif %}</td>
          <td><a class="standard-link" href="{{ speaker_url | relative_url }}">{{ speaker.name | escape }}</a></td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
</section>
