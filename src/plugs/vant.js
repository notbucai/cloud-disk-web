import Vue from 'vue';
import { Button } from 'vant';
import { Panel } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Icon } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Search } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { NavBar } from 'vant';
import { SwipeCell } from 'vant';
import { PullRefresh } from 'vant';
import { Dialog } from 'vant';
import { Field } from 'vant';
import { Uploader } from 'vant';
import { Circle } from 'vant';
import { Tag } from 'vant';
import { Row, Col } from 'vant';
import { Loading } from 'vant';
import { Progress } from 'vant';
import { Step, Steps } from 'vant';
import { Notify } from 'vant';

Vue.use(Notify);
Vue.use(Step).use(Steps);
Vue.use(Progress);
Vue.use(Loading);
Vue.use(Row).use(Col);
Vue.use(Tag);
Vue.use(Circle);
Vue.use(Uploader);
Vue.use(Field);
Vue.use(Dialog);
Vue.use(PullRefresh);
Vue.use(SwipeCell);
Vue.use(NavBar);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Search);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Icon);
Vue.use(Cell).use(CellGroup);
Vue.use(Panel);
Vue.use(Button);