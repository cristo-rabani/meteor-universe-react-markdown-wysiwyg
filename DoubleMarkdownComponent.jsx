import Editor from './ReactMarkdownMediumEditor.jsx';
import Tabs, {TabPane} from 'rc-tabs';
import onResize from './mixins/on-resize';
import {_i18n as i18n} from 'meteor/universe:i18n';

const T = i18n.createComponent('universe:react-markdown-wysiwyg');

export default React.createClass({
    displayName: 'DoubleMarkdownComponent',
    mixins: [onResize],
    getInitialState () {
        return {
            activeKey: '1',
            markdown: this.props.markdown
        };
    },
    render () {
        let style = {minHeight: this.state.height};
        return (
            <Tabs activeKey={this.state.activeKey} onChange={this.onChangeActiveTab}>
                <TabPane tab={T.__('visual')} key="1">
                    <Editor
                        className={'editor' + (this.props.className? ' ' + this.props.className : '')}
                        style={style}
                        markdown={this.state.markdown}
                        onChange={this.onChange}
                        options={this.props.options}
                        />
                </TabPane>
                <TabPane tab={T.__('markdown')} key="2">
                    <textarea className={'editor' + (this.props.className?  ' ' +  this.props.className: '')}
                              style={style}
                              value={this.state.markdown}
                              onChange={event => this.onChange(event.target.value)}
                              placeholder={T.__('typeYourText')}
                        />
                </TabPane>
            </Tabs>
        );
    },
    onChangeActiveTab (key) {
        this.setState({
            activeKey: key
        });
    },
    onResize () {
        this.setState({height: Math.max(ReactDOM.findDOMNode(this).clientHeight, 100)});
    },
    onChange (markdown) {
        this.setState({markdown});
        if (this.props.onChange) {
            this.props.onChange(markdown);
        }
    }
});