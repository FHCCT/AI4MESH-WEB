---
layout: default
title: Venue & Travel
nav_key: venue
---

{% assign conference = site.data.conference %}
{% capture session_venues %}<h3>Conference Rooms</h3>{% for day in site.data.program.days %}{% if day.venue %}<p><strong>{{ day.date | escape }}:</strong> {{ day.venue | escape }}</p>{% endif %}{% endfor %}<p>Lunch venue: Canteen 3F.</p>{% endcapture %}
<section class="content-panel" aria-labelledby="venue-title"><h2 class="panel-title" id="venue-title">Venue &amp; Travel</h2><div class="panel-body prose"><h3>{{ conference.venue.name | escape }}</h3><p>{{ conference.venue.address }}</p><p><a class="standard-link" href="{{ conference.venue.map_url }}" target="_blank" rel="noopener noreferrer">View the venue on OpenStreetMap</a></p>{{ session_venues }}<h3>About Dalian</h3>{% for paragraph in conference.city_intro %}<p>{{ paragraph }}</p>{% endfor %}<h3>Places of Interest</h3><ul class="plain-list">{% for place in conference.city_highlights %}<li>{{ place }}</li>{% endfor %}</ul></div></section>
