---
layout: default
title: Program
nav_key: program
---

<section class="content-panel" aria-labelledby="program-title">
  <h2 class="panel-title" id="program-title">Program</h2>
  <div class="panel-body prose">
    <p>The workshop takes place on {{ site.data.conference.date_display }}. The detailed schedule and session times will be announced.</p>
    <h3>Talk Titles</h3>
    {% for speaker in site.data.speakers %}
    {% if speaker.talk_title %}
    <h3>{{ speaker.talk_title | escape }}{% if speaker.talk_tentative %} (tentative){% endif %}</h3>
    <p><a class="standard-link" href="{{ '/speakers/' | relative_url }}#{{ speaker.id }}">{{ speaker.name | escape }}</a><br>{{ speaker.institution | escape }}{% if speaker.abstract %}<br><a class="standard-link" href="{{ '/speakers/' | relative_url }}#{{ speaker.id }}-abstract">Read abstract</a>{% endif %}</p>
    {% endif %}
    {% endfor %}
  </div>
</section>
