<?php

namespace App\Entity;

use App\Repository\SubjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata as Api;
use ApiPlatform\Metadata\ApiProperty;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\Mapping\Annotation as Gedmo;

#[ORM\Entity(repositoryClass: SubjectRepository::class)]
#[Api\ApiResource(
    normalizationContext:['groups' => ['read_subject']],
    denormalizationContext:['groups' => ['create_subject']],
    operations:[
        new Api\GetCollection(),
        new Api\Post(),
        new Api\Get(),
        new Api\Put(),
        new Api\Delete()
    ]
)]
class Subject
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[ApiProperty(identifier:false)]
    #[Groups(['read_subject'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_subject','create_subject'])]
    private ?string $title = null;

    #[ORM\ManyToOne(inversedBy: 'subjects')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read_subject', 'read_category', 'create_subject'])]
    private ?Category $category = null;

    #[ORM\OneToMany(mappedBy: 'subject', targetEntity: Course::class, orphanRemoval: true)]
    private Collection $courses;

    #[ORM\Column(length: 255)]
    #[Groups(['read_subject'])]
    #[Gedmo\Slug(fields:['title'])]
    #[ApiProperty(identifier:true)]
    private ?string $slug = null;

    public function __construct()
    {
        $this->courses = new ArrayCollection();
    }

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

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection<int, Course>
     */
    public function getCourses(): Collection
    {
        return $this->courses;
    }

    public function addCourse(Course $course): static
    {
        if (!$this->courses->contains($course)) {
            $this->courses->add($course);
            $course->setSubject($this);
        }

        return $this;
    }

    public function removeCourse(Course $course): static
    {
        if ($this->courses->removeElement($course)) {
            // set the owning side to null (unless already changed)
            if ($course->getSubject() === $this) {
                $course->setSubject(null);
            }
        }

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }
}
