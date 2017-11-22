export default {
  select: function(block) {
    if(this.selected) {
      this.selected.container.classList.remove('block-selected')
    }
    this.selected = block;
    this.selected.container.classList.add('block-selected')
  },

  delete: function() {
    this.selected.destroy();
  }
}