import { CollectionItem } from './CollectionItem';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
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

    @OneToMany(() => CollectionItem, (ci) => ci.item)
    collectionItems: CollectionItem[];

    @CreateDateColumn()
    createdDate?: Date

    @UpdateDateColumn()
    updatedDate?: Date
}
