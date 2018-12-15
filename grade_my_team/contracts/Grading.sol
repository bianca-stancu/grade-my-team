pragma solidity ^0.4.18;

contract Grading {

    event Forgery();

    struct Grade {
        bytes32 from;
        bytes32 to;
        uint grade;
    }

    struct Metrics{
        bytes32 student_id;
        uint average_grade_to_self;
        uint average_grade_to_others;
        uint average_grade_from_others;
    }

    constructor() public {
    }

    mapping(bytes32 => Grade[]) private assignment_grades;
    mapping(bytes32 => Grade[]) private professor_grades;
    mapping(bytes32 => uint) private overall_grade;
    mapping(bytes32 => Metrics) private student_metrics;
    
    function addOverallGrade(bytes32 _assignment_id, uint _grade) public {
        if(overall_grade[_assignment_id] == 0) {
            overall_grade[_assignment_id] = _grade;
        } else {
            emit Forgery();
        }
    }

    function getOverallGrade(bytes32 _assignment_id) public returns (uint) {
        return overall_grade[_assignment_id];
    }

    function addToStudents(bytes32 _assignment_id, bytes32 _from, bytes32 _to, uint _grade) private {
        if(assignment_grades[_assignment_id].length == 0) {
            Grade[] _init;
            assignment_grades[_assignment_id] = _init;
        }
        Grade memory grade = Grade(_from,_to,_grade);
        assignment_grades[_assignment_id].push(grade);
    }

    function addToProfessors(bytes32 _assignment_id, bytes32 _from, bytes32 _to, uint _grade) private {
        if(professor_grades[_assignment_id].length == 0) {
            Grade[] _init;
            professor_grades[_assignment_id] = _init;
        }
        Grade memory grade = Grade(_from,_to,_grade);
        professor_grades[_assignment_id].push(grade);
    }

    function addGradeTo(bytes32 _assignment_id, bytes32 _from, bytes32 _to, uint _grade, bool _professor_grading) public returns(bool){
        if (_professor_grading == false){
            if(_from == _to) {
                updateMetricToSelf(_from, _grade);
            }
            updateMetricFromOthers(_to, _grade);
            updateMetricToOthers(_from, _grade);
            addToStudents(_assignment_id,_from,_to,_grade);
        } else {
            addToProfessors(_assignment_id,_from,_to,_grade);
        }
        return true;
    }

    function updateMetricToSelf(bytes32 user, uint _grade) private {
        uint current_grade = getMetricAverageToSelf(user); 
        if(current_grade == 0) {
            setMetricAverageToSelf(user,_grade);
        } else {
            setMetricAverageToSelf(user,(current_grade + _grade) / 2);
        }
    }

    function getMetricAverageToSelf(bytes32 user) public returns (uint) {
        return student_metrics[user].average_grade_to_self;
    }

    function setMetricAverageToSelf(bytes32 user, uint value) private {
        student_metrics[user].average_grade_to_self = value;
    }

    function updateMetricFromOthers(bytes32 user, uint _grade) private {
        uint current_grade = getMetricAverageFromOthers(user); 
        if(current_grade == 0) {
            setMetricAverageFromOthers(user,_grade);
        } else {
            setMetricAverageFromOthers(user,(current_grade + _grade) / 2);
        }
    }

    function getMetricAverageFromOthers(bytes32 user) public returns (uint) {
        return student_metrics[user].average_grade_from_others;
    }

    function setMetricAverageFromOthers(bytes32 user, uint value) private {
        student_metrics[user].average_grade_from_others = value;
    }

    function updateMetricToOthers(bytes32 user, uint _grade) private {
        uint current_grade = getMetricAverageToOthers(user); 
        if(current_grade == 0) {
            setMetricAverageToOthers(user,_grade);
        } else {
            setMetricAverageToOthers(user,(current_grade + _grade) / 2);
        }
    }

    function getMetricAverageToOthers(bytes32 user) public returns (uint) {
        return student_metrics[user].average_grade_to_others;
    }

    function setMetricAverageToOthers(bytes32 user, uint value) private {
        student_metrics[user].average_grade_to_others = value;
    }

    function getMetrics(bytes32 user) public returns (uint,uint,uint){
        return (getMetricAverageToSelf(user), getMetricAverageFromOthers(user),getMetricAverageToSelf(user));
    }

    function getGradesProfessor(bytes32 _assignment_id)
        public
        returns (bytes32[], uint[]) {
        uint assignment_length = professor_grades[_assignment_id].length;
        bytes32[] memory students = new bytes32[](assignment_length);
        uint[] memory grades = new uint[](assignment_length);
        for (uint i = 0; i < assignment_length; i++) {
            students[i] = professor_grades[_assignment_id][i].to;
            grades[i] = professor_grades[_assignment_id][i].grade;
        }
        return (students, grades);
    }

    function getGradeFor(bytes32 _assignment_id, bytes32 _student_id) public returns (uint,uint){
        uint assignment_length_students = assignment_grades[_assignment_id].length;
        uint student_average = 0;
        uint count = 0;
        for (uint i = 0; i < assignment_length_students; i++) {
            if (assignment_grades[_assignment_id][i].to == _student_id) {
                student_average = student_average + assignment_grades[_assignment_id][i].grade;
                count = count + 1;
            }
        }
        student_average = student_average / count;
        return (student_average, count); 
    }

    function getProfessorGrade(bytes32 _assignment_id, bytes32 _student_id) private returns (uint){
        uint assignment_length_prof = professor_grades[_assignment_id].length;
        for (uint j = 0; j < assignment_length_prof; j++) {
            if (professor_grades[_assignment_id][j].to == _student_id) {
                return professor_grades[_assignment_id][j].grade;
            }
        }
    }

    function getMalus(int grade) private returns (uint){
        if (grade < 0){ 
            if(grade <= -10 && grade > -25){
                return 5;
            } else if (grade <= -25 && grade > -50){
                return 10;
            } else if (grade <= -50){
                return 15;
            } 
        }
        return 0;
    }

    function getGrade(bytes32 _assignment_id, bytes32 _student_id) public returns (uint, uint){
        uint student_average = 0;
        uint ok = 0;
        (student_average,ok) = getGradeFor(_assignment_id, _student_id);
        uint malus = getMalus((int(student_average) - 10) * 10);
        uint overall = overall_grade[_assignment_id];
        uint prof_grade = getProfessorGrade(_assignment_id, _student_id);
        uint fair_grade = overall - malus;
        return (prof_grade,fair_grade);
    }
}
