---
layout: default
title: Topics
nav_key: topics
---

{% assign conference = site.data.conference %}
<section class="content-panel" aria-labelledby="topics-title">
  <h2 class="panel-title" id="topics-title">Topics</h2>
  <div class="panel-body"><ul class="topic-list">
    {% for topic in conference.topics %}<li>{{ topic }}</li>{% endfor %}
  </ul></div>
</section>
