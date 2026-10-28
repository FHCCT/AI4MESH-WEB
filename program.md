---
layout: default
title: Program
nav_key: program
---

<section class="content-panel" aria-labelledby="program-title">
  <h2 class="panel-title" id="program-title">Program</h2>
  <div class="panel-body prose">
    <p>Conference talks take place on {{ site.data.conference.date_display }}. All-day registration is on 28 October 2026.</p>
    <p>Venue: {{ site.data.program.venue | escape }}.</p>
    {% for day in site.data.program.days %}
    <h3 id="program-day-{{ forloop.index }}">{{ day.date | escape }}</h3>
    {% if day.venue %}<p>Venue: {{ day.venue | escape }}</p>{% endif %}
    <table class="program-table" aria-labelledby="program-day-{{ forloop.index }}">
      <thead><tr><th scope="col">Time</th><th scope="col">Talk title</th><th scope="col">Speaker</th></tr></thead>
      <tbody>
        {% for entry in day.entries %}
        <tr>
          <td>{{ entry.time | escape }}</td>
          <td>{{ entry.title | escape }}{% if entry.items %}<ol class="program-items">{% for item in entry.items %}<li>{{ item | escape }}</li>{% endfor %}</ol>{% endif %}{% if entry.location %}<span class="program-meta">Venue: {{ entry.location | escape }}</span>{% endif %}{% if entry.chair %}<span class="program-meta">Chair: {{ entry.chair | escape }}</span>{% endif %}</td>
          <td>{% if entry.speaker_id %}{% assign speaker_url = '/speakers/' | append: entry.speaker_id | append: '/' %}<a class="standard-link" href="{{ speaker_url | relative_url }}">{{ entry.speaker | escape }}</a>{% else %}{{ entry.speaker | escape }}{% endif %}{% if entry.online %} (online){% endif %}{% if entry.institution %}<span class="program-meta">{{ entry.institution | escape }}</span>{% endif %}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
    {% endfor %}
  </div>
</section>
