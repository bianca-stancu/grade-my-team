pragma solidity ^0.4.18;

contract Grading {
    struct Grade {
        bytes32 from;
        bytes32 to;
        uint grade;
    }

    constructor() public {
    }

    bytes32[] assignment_ids;

    mapping(bytes32 => Grade[]) private assignments;

    function addAssignment (bytes32 _assignment_id) public {
        Grade[] _init;
        assignmentsCount++;
        assignments[_assignment_id] = _init;
    }

    function addGradeTo(bytes32 _assignment_id, bytes32 _from, bytes32 _to, uint _grade) public {
        Grade memory grade = Grade(_from,_to,_grade);
        assignments[_assignment_id].push(grade);
    }

    uint public assignmentsCount;

    function getGradesCount(bytes32 _assignment_id) public returns(uint[]) {
        uint[] gradesCount;
        for (uint i = 0; i < assignments[_assignment_id].length; i++) {                        
            gradesCount.push(assignments[_assignment_id][i].grade);
        } 
        gradesCount.push(assignments[_assignment_id].length);
        return gradesCount;
    }
}
