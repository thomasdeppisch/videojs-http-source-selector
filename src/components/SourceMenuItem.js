import videojs from 'video.js';
const MenuItem = videojs.getComponent('MenuItem');
const Component = videojs.getComponent('Component');

class SourceMenuItem extends MenuItem
{
  constructor(player, options) {
    options.selectable = true;
    options.multiSelectable = false;

    super(player, options);
    this.update();
  }

  handleClick() {
    var selected = this.options_;
    super.handleClick();
    var levels = this.player().qualityLevels();

    for(var i = 0; i < levels.length; i++) {
      if (selected.index == levels.length) {
        // If this is the Auto option, enable all renditions for adaptive selection
        levels[i].enabled = true;
      } else if (selected.index == i) {
        levels[i].enabled = true;
      } else {
        levels[i].enabled = false;
      }
    }

    levels.selectedIndex_ = selected.index;
    levels.trigger({ type: 'change', selectedIndex: selected.index });
  }

  update() {
    let levels = this.player().qualityLevels();
    let numEnabledLevels = 0;
    for (let i = 0; i < levels.length; i++) 
    {
        if (levels[i].enabled)
            numEnabledLevels = numEnabledLevels + 1;
    }

    if (numEnabledLevels === 1) // not auto option
        this.selected(this.options_.index === levels.selectedIndex);
    else // auto: more than one quality is enabled
        this.selected(this.options_.index === levels.length);
  }
}

Component.registerComponent('SourceMenuItem', SourceMenuItem);
export default SourceMenuItem;
