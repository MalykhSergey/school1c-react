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

export function getNameWithNumberOfClass(classDTO: ClassDTO): string {
	return classDTO.classNumber + "-" + classDTO.className
}