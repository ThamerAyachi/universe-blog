import { getCurrentDate } from 'src/shared/methods';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity({ name: 'blogs' })
export class BlogEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@Column()
	title: string;

	@Column()
	content: string;

	@Column({ nullable: true })
	cover: string;

	@Column({ default: 0 })
	views: number;

	@Column({ type: 'date', name: 'create_at', default: getCurrentDate() })
	createAt: Date;

	@Column({ type: 'date', name: 'update_at', default: getCurrentDate() })
	updateAt: Date;

	@ManyToOne(() => UserEntity, (UserEntity) => UserEntity.blogs)
	@JoinColumn()
	author: UserEntity;
}
