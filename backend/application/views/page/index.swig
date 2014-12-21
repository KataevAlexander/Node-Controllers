{% extends 'core/index.swig' %}

{% block body %}
  <script src="static/js/external.js"></script>
  <script src="static/js/internal.js"></script>

  <div al-app="CoreController">
    <div al-repeat="item in items">
      {{ item }}
    </div>
  </div>

  index view template
{% endblock body %}