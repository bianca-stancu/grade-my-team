pragma solidity ^0.4.18;

contract Grading {
    struct Grade {
        uint id;
        string name;
        uint grade;
    }
    
    constructor() public {
        addGrade("Candidate 1");
        addGrade("Candidate 2");
    }
    // Read/write Grades
    mapping(uint => Grade) public grades;

    // Store Grades Count
    uint public gradesCount;

    function addGrade (string _name) public {
        gradesCount ++;
        grades[gradesCount] = Grade(gradesCount, _name, 0);
    }
}
