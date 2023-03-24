Component({
  mixins: [],
  data: {},
  props: {
    title: '国新证券',
    leftText: '',
    rightText: '',
    leftIcon: '/static/image/components/nav-bar/nav_icon_back.png',
    rightIcon: '',
    leftIconShow: true,
    rightIconShow: false,
    onLeftTap: (e) => {},
    onRightTap: (e) => {},
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    leftTap(e) {
      this.props.onLeftTap(e);
      console.log('leftTap');
    },
    rightTap(e) {
      this.props.onRightTap(e);
      console.log('rightTap');
    },
  },
});
