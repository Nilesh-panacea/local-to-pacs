import { Request } from "express";
import { IPaginataionParams } from "../../shared/Types/pagination.types";
import { StudyRepository } from "../Repository/studies.repository";

export class StudiesServices{
    private repository: StudyRepository;
    constructor(){
        this.repository = new StudyRepository;
    }
    public getStudies = async (paginationPayload: IPaginataionParams )=>{
        const { findStudies, totalItems, totalPages, page } = await this.repository.getStudies(paginationPayload);
        return { findStudies, totalItems, totalPages, page };
    }
    // public postStudies = async () 
}