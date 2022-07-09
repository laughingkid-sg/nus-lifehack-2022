import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { Collection } from "./Collection"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "bigint", unique: true })
    telegramId: string

    @Column({ type: "varchar", length: 32, unique: true, nullable: true })
    handle?: string

    @Column({ type: "varchar", length: 64 })
    firstName: string

    @Column({ type: "varchar", length: 64, nullable: true })
    lastName?: string

    @Column({ type: "varchar" })
    postal: string

    @OneToMany((type) => Collection, (collection) => collection.user, { nullable: false })
    collections: Collection[]

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}