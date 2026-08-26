---
layout: default
title: Registration
nav_key: registration
---

{% assign conference = site.data.conference %}
<section class="content-panel" aria-labelledby="registration-title"><h2 class="panel-title" id="registration-title">Registration</h2><div class="panel-body prose"><p>{{ conference.registration.summary }}</p><dl class="fact-list">{% for fact in conference.registration.facts %}<div><dt>{{ fact.label }}</dt><dd>{{ fact.value }}</dd></div>{% endfor %}</dl><h3>Important Dates</h3><dl class="date-list"><div><dt>Workshop</dt><dd>{{ conference.date_display }}</dd></div></dl><h3>Visa Information</h3><p>{{ conference.visa }}</p></div></section>
