<?php

namespace App\Entity;

use App\Repository\SubjectRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SubjectRepository::class)]
class Subject
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\OneToOne(inversedBy: 'subject', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Category $category_id = null;

    #[ORM\OneToOne(mappedBy: 'subject_id', cascade: ['persist', 'remove'])]
    private ?Course $course = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getCategoryId(): ?Category
    {
        return $this->category_id;
    }

    public function setCategoryId(Category $category_id): static
    {
        $this->category_id = $category_id;

        return $this;
    }

    public function getCourse(): ?Course
    {
        return $this->course;
    }

    public function setCourse(Course $course): static
    {
        // set the owning side of the relation if necessary
        if ($course->getSubjectId() !== $this) {
            $course->setSubjectId($this);
        }

        $this->course = $course;

        return $this;
    }
}
