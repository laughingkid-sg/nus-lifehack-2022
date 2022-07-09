import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { Collection } from "./Collection"

@Entity()
export class Item {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 32 })
    name: string

    @Column({ type: "text" })
    description: string

    @Column({ type: "text"})
    cateogry: string

    @Column({ type: "int" })
    points: number

    @Column("text")
    productImg: string

    @ManyToOne((type) => Collection, (collection) => collection.items, {
        nullable: false,
    })
    collection: Collection

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate?: Date
}
