---
layout: default
title: Committees
nav_key: committees
---

{% assign conference = site.data.conference %}
<section class="content-panel" aria-labelledby="committee-title"><h2 class="panel-title" id="committee-title">Committees</h2><div class="panel-body"><h3 class="subsection-title">Conference Chairs</h3><div class="table-wrap"><table class="committee-table"><thead><tr><th scope="col">Name</th><th scope="col">Institution</th><th scope="col">Location</th></tr></thead><tbody>{% for chair in conference.chairs %}<tr><td data-label="Name">{{ chair.name }}</td><td data-label="Institution">{{ chair.institution }}</td><td data-label="Location">{{ chair.location }}</td></tr>{% endfor %}</tbody></table></div></div></section>
