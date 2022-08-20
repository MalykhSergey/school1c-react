export class ClassDTO {
    classId: number;
    className: string;
    classNumber: number;

	constructor($id: number, $className: string, $classNumber: number) {
		this.classId = $id;
		this.className = $className;
		this.classNumber = $classNumber;
	}
    
}