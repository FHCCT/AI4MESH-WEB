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
      <li><a class="standard-link" href="#{{ speaker.id }}">{{ speaker.name | escape }}</a> — {{ speaker.institution | escape }}</li>
      {% endfor %}
    </ul>
    {% for speaker in site.data.speakers %}
    <h3 id="{{ speaker.id }}">{{ speaker.name | escape }}</h3>
    <p>{{ speaker.institution | escape }}<br>
      <a class="standard-link" href="{{ speaker.profile_url | escape }}" target="_blank" rel="noopener noreferrer">{{ speaker.profile_label | escape }}</a>
      {% if speaker.photo_path %} · <a class="standard-link" href="{{ speaker.photo_path | relative_url }}" target="_blank" rel="noopener noreferrer">Photo</a>{% elsif speaker.photo_url %} · <a class="standard-link" href="{{ speaker.photo_url | escape }}" target="_blank" rel="noopener noreferrer">Photo</a>{% endif %}
    </p>
    {% if speaker.talk_title %}
    <p><strong>Talk title{% if speaker.talk_tentative %} (tentative){% endif %}:</strong> {{ speaker.talk_title | escape }}</p>
    {% endif %}
    {% if speaker.abstract %}
    <h4 id="{{ speaker.id }}-abstract">Abstract</h4>
    {% for paragraph in speaker.abstract %}<p>{{ paragraph | escape }}</p>{% endfor %}
    {% endif %}
    <h4>Biography</h4>
    {% for paragraph in speaker.biography %}<p>{{ paragraph | escape }}</p>{% endfor %}
    <p><a class="standard-link" href="#speaker-directory">Back to speaker list</a></p>
    {% endfor %}
  </div>
</section>
