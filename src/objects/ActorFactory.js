import SpineActor from './SpineActor';

window.ActorFactory = {
  create: function(className, id) {
    return new [className]();
  }
}