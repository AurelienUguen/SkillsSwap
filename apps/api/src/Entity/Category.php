<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\OneToOne(mappedBy: 'category_id', cascade: ['persist', 'remove'])]
    private ?Subject $subject = null;

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

    public function getSubject(): ?Subject
    {
        return $this->subject;
    }

    public function setSubject(Subject $subject): static
    {
        // set the owning side of the relation if necessary
        if ($subject->getCategoryId() !== $this) {
            $subject->setCategoryId($this);
        }

        $this->subject = $subject;

        return $this;
    }
}
