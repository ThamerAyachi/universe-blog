import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	UseGuards,
	Req,
	BadRequestException,
	HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/JwtAuth.guard';
import { CommentsEntity } from 'src/typeorm/CommentsEntity';
import { UserEntity } from 'src/typeorm/UserEntity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Post(':blogId')
	@UsePipes(ValidationPipe)
	@UseGuards(JwtAuthGuard)
	async create(
		@Body() createCommentDto: CreateCommentDto,
		@Param('blogId') blogId: string,
		@Req() req: Request,
	): Promise<CommentsEntity> {
		const blog = await this.commentService.findOneBlog({ id: blogId });
		if (!blog)
			throw new BadRequestException(`Article with id #${blogId} not found`);

		return await this.commentService.create(
			createCommentDto,
			blogId,
			req.user as UserEntity,
		);
	}

	@Get('single/:id')
	async findOne(@Param('id') id: string): Promise<CommentsEntity> {
		const comment = await this.commentService.findOneComment('id', id);

		if (!comment)
			throw new BadRequestException(`Comment with id #${id} not found`);

		return comment;
	}

	@Delete('delete/:id')
	@UseGuards(JwtAuthGuard)
	async remove(@Param('id') id: string, @Req() req: Request) {
		const comment = await this.commentService.findOneComment('id', id);
		if (!comment)
			throw new BadRequestException(`Comment with id #${id} not found`);

		const user: UserEntity = req.user as UserEntity;
		if (comment.author.email != user.email)
			throw new BadRequestException(
				" You don't have proems to delete this comment",
			);
		await this.commentService.remove(id);
		return { message: 'Delete succuss', status: HttpStatus.OK };
	}
}
