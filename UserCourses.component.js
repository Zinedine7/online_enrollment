import React, {Component} from "react";
import axios from 'axios';
import {Form, InputGroup, Col, Button, Card, Table} from "react-bootstrap";
import Cookie from "js-cookie";
import {Typeahead} from 'react-bootstrap-typeahead';

const RemoveBtnStyle = {
    'textAlign': 'center'
};

export default class UserCourses extends Component {

    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.removeCourse = this.removeCourse.bind(this);


        this.state = {
            UserCourses: [],
            options: [],
            selected: undefined,
            type: "Regular",
            order: "Primary",
            ref: React.createRef()
        };

    }

    //Right before anything load the page this is called
    componentDidMount() {
        axios.get('http://localhost:5000/users?token=' + Cookie.get('token') + "&userId="+Cookie.get('userId'))
            .then(res => {
                this.setState({UserCourses:res.data.courses});
            })
            .catch((err) => {
                alert('Error: ' + err);
            });
    }

    //InputChange for the course box
    onInputChange(e) {

        if(e.length<3)
            return;

        axios.get('http://localhost:5000/courses/search?value=' + e + '&token=' + Cookie.get('token') + "&userId="+Cookie.get('userId'))
            .then(res => {

                var options = [];

                res.data.forEach((item,index) => {
                    options.push({id:item._id,label:item.course_id+' ' + item.course_name});
                });
                this.setState({options:options});

            })
            .catch((err) => {
                alert('Error: ' + err);
            });
    }

    removeCourse(index)
    {
        console.log(index);
        this.state.UserCourses.splice(index, 1);
        this.setState({UserCourses:this.state.UserCourses});
    }

    addCourse()
    {
        if(this.state.selected === undefined)
            return;

        this.state.UserCourses.push({order:this.state.order,type:this.state.type,course_id:this.state.selected[0].id,code:this.state.selected[0].label.split(' ')[0]});
        this.setState({
            UserCourses:this.state.UserCourses,
            selected: undefined,
            options: []
        });

        this.state.ref.current.clear()
        document.getElementById('coursesSelection')
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("Submitting");
        console.log(this.state.UserCourses);

        const userCourses = {
            userId:Cookie.get('userId'),
            courses: this.state.UserCourses
        };

        console.log(userCourses);

        axios.post('http://localhost:5000/users/setUserCourses?token=' + Cookie.get('token') + "&userId="+Cookie.get('userId'),userCourses)
            .then(res => {
                console.log(res);
                window.location = '/UserCourses';
            })
            .catch((err) => {
                alert('Error: ' + err);
                window.location = '/UserCourses';
            });


    }

    render() {
        return (
            <div class="myCourses">
          <div class="menu">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
          </div>
          <div class="upperNav">
            <div class="search">
              <form class="searchForm">
                <input type="search" name="search" placeholder="Search" />
              </form>
              <button class="magnifier">
                <img src="../img/magnifier.png" class="manifierImg" />
              </button>
            </div>
            <div class="prevNext">
              
            </div>
          </div>
          <div class="downNav">
            <div class="passedCurrent">
              <a id="passedC">Passed courses</a>
              <a id="currentC">Current courses</a>
            </div>
            <div class="addMore">
              <button>Add Passed</button>
            </div> -->
          </div>
          <div class="passedCourses">
            <table class="semester">
              <thead>
                <tr>
                  <th class="semesterNum" colspan="4">
                    1. semester: 2017/2018 Fall
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="info">
                  <td>Course Code</td>
                  <td>Course Name</td>
                  <td>Credit</td>
                  <td>Letter Final Grade</td>
                </tr>
                <tr>
                  <td>CS103</td>
                  <td>Introduction to Programming</td>
                  <td>3 | 6</td>
                  <td>B+</td>
                </tr>
                <tr>
                  <td>ELIT100</td>
                  <td>Academic English and Effective Communication</td>
                  <td>3 | 6</td>
                  <td>A-</td>
                </tr>
                <tr>
                  <td>MATH101</td>
                  <td>Calculus I</td>
                  <td>3 | 6</td>
                  <td>B-</td>
                </tr>
                <tr>
                  <td>Course Code</td>
                  <td>Understanding Science and Technology</td>
                  <td>1.5 | 3</td>
                  <td>A</td>
                </tr>
                <tr>
                  <td>Course Code</td>
                  <td>Introduction to Psychology</td>
                  <td>3 | 6</td>
                  <td>C+</td>
                </tr>
                <tr>
                  <td>TURK111</td>
                  <td>Spoken Turkish I</td>
                  <td>1.5 | 3</td>
                  <td>A</td>
                </tr>
              </tbody>
            </table>
            <table class="semester">
              <thead>
                <tr>
                  <th class="semesterNum" colspan="4">
                    2. semester: 2017/2018 Spring
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="info">
                  <td>Course Code</td>
                  <td>Course Name</td>
                  <td>Credit</td>
                  <td>Letter Final Grade</td>
                </tr>
                <tr>
                  <td>CS103</td>
                  <td>Introduction to Programming</td>
                  <td>3 | 6</td>
                  <td>B+</td>
                </tr>
                <tr>
                  <td>ELIT100</td>
                  <td>Academic English and Effective Communication</td>
                  <td>3 | 6</td>
                  <td>A-</td>
                </tr>
                <tr>
                  <td>MATH101</td>
                  <td>Calculus I</td>
                  <td>3 | 6</td>
                  <td>B-</td>
                </tr>
                <tr>
                  <td>Course Code</td>
                  <td>Understanding Science and Technology</td>
                  <td>1.5 | 3</td>
                  <td>A</td>
                </tr>
                <tr>
                  <td>Course Code</td>
                  <td>Introduction to Psychology</td>
                  <td>3 | 6</td>
                  <td>C+</td>
                </tr>
                <tr>
                  <td>TURK111</td>
                  <td>Spoken Turkish I</td>
                  <td>1.5 | 3</td>
                  <td>A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      
        
        );
    }
}
