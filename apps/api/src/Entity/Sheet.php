<?php

namespace App\Entity;

use App\Repository\SheetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata as Api;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SheetRepository::class)]
#[Api\ApiResource(
    normalizationContext:['groups' => ['read_sheet']],
    denormalizationContext:['groups' => ['create_sheet']],
    operations:[
        new Api\GetCollection(),
        new Api\Post(),
        new Api\Get(),
        new Api\Put(),
        new Api\Delete()
    ]
)]
class Sheet
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read_sheet', 'read_user'])]
    #[Api\ApiProperty(identifier:false)]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_sheet','read_user', 'create_sheet', 'read_lesson'])]
    private ?string $title = null;

    #[ORM\ManyToOne(inversedBy: 'sheets')]
    #[Groups(['read_sheet', 'create_sheet', 'read_lesson'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'sheets')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read_sheet', 'create_sheet', 'read_lesson'])]
    private ?Category $category = null;

    #[ORM\Column]
    #[Groups(['read_sheet', 'read_user', 'create_sheet'])]
    private ?bool $irl = null;

    #[ORM\Column]
    #[Groups(['read_sheet', 'read_user', 'create_sheet'])]
    private ?bool $visio = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['read_sheet', 'create_sheet'])]
    private ?string $description = null;

    #[ORM\ManyToMany(targetEntity: Language::class, inversedBy: 'sheets')]
    #[Groups(['read_sheet', 'create_sheet', 'read_user'])]
    private Collection $language;

    #[ORM\OneToMany(mappedBy: 'sheet', targetEntity: Lesson::class, orphanRemoval: true)]
    private Collection $lessons;

    #[ORM\Column(length: 255)]
    #[Gedmo\Slug(fields:['title'])]
    #[Api\ApiProperty(identifier:true)]
    #[Groups(['read_sheet', 'read_lesson'])]
    private ?string $slug = null;

    public function __construct()
    {
        $this->language = new ArrayCollection();
        $this->lessons = new ArrayCollection();
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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

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

    public function isIrl(): ?bool
    {
        return $this->irl;
    }

    public function setIrl(bool $irl): static
    {
        $this->irl = $irl;

        return $this;
    }

    public function isVisio(): ?bool
    {
        return $this->visio;
    }

    public function setVisio(bool $visio): static
    {
        $this->visio = $visio;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Language>
     */
    public function getLanguage(): Collection
    {
        return $this->language;
    }

    public function addLanguage(Language $language): static
    {
        if (!$this->language->contains($language)) {
            $this->language->add($language);
        }

        return $this;
    }

    public function removeLanguage(Language $language): static
    {
        $this->language->removeElement($language);

        return $this;
    }

    /**
     * @return Collection<int, Lesson>
     */
    public function getLessons(): Collection
    {
        return $this->lessons;
    }

    public function addLesson(Lesson $lesson): static
    {
        if (!$this->lessons->contains($lesson)) {
            $this->lessons->add($lesson);
            $lesson->setSheet($this);
        }

        return $this;
    }

    public function removeLesson(Lesson $lesson): static
    {
        if ($this->lessons->removeElement($lesson)) {
            // set the owning side to null (unless already changed)
            if ($lesson->getSheet() === $this) {
                $lesson->setSheet(null);
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
