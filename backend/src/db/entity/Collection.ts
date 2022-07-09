import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { Item } from "./Item"
import { User } from "./User"

export enum CollectionStatus {
    PENDING = "pending",
    CANCELLED = "cancelled",
    SCHEDULED = "scheduled",
    COLLECTED = "collected",
    COMPLETED = "completed",
}

@Entity()
export class Collection {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    collectionDate: string

    @Column({ default: CollectionStatus.PENDING, nullable: false })
    stauts: CollectionStatus

    @Column({ type: "int" })
    pointsAwarded: number

    @Column({ type: "int" })
    pointClaimed: number

    @ManyToOne((type) => User, (user) => user.collections, { nullable: false })
    user: User

    @OneToMany((type) => Item, (item) => item.collection)
    items: Item[]

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}
