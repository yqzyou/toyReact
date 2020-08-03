import {ToyReact, Component} from './toyReact';

class MyComponent extends Component{
    render() {
        return <div>
            <span>hello</span>
            <span>world</span>
            <div>
                {this.children}
            </div>
        </div>
    }
}

let a = <MyComponent name="a" id='id'>
        <div>124</div>
    </MyComponent>

ToyReact.render(
    a,
    document.body
)