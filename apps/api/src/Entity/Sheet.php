<?php

namespace App\Entity;

use App\Repository\SheetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use ApiPlatform\Metadata as Api;
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
    #[Api\ApiProperty(identifier:false)]
    #[Groups(['read_sheet'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_sheet', 'create_sheet'])]
    private ?string $title = null;

    #[ORM\ManyToOne(inversedBy: 'sheets')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read_sheet', 'create_sheet'])]
    private ?User $user = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['read_sheet', 'create_sheet'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['read_sheet', 'create_sheet'])]
    private ?bool $irl = null;

    #[ORM\Column]
    #[Groups(['read_sheet', 'create_sheet'])]
    private ?bool $visio = null;

    #[ORM\ManyToMany(targetEntity: Language::class, inversedBy: 'sheets')]
    #[Groups(['read_sheet', 'create_sheet'])]
    private Collection $language;

    #[ORM\OneToOne(mappedBy: 'sheet', cascade: ['persist', 'remove'])]
    #[Groups(['read_sheet', 'create_sheet'])]
    private ?Lesson $lesson = null;

    #[ORM\ManyToOne(inversedBy: 'sheets')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read_sheet', 'create_sheet'])]
    private ?Category $category = null;

    #[ORM\Column(length: 255)]
    #[Gedmo\Slug(fields:['title'])]
    #[Groups(['read_sheet'])]
    #[Api\ApiProperty(identifier:true)]
    private ?string $slug = null;

    public function __construct()
    {
        $this->language = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

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

    public function getLesson(): ?Lesson
    {
        return $this->lesson;
    }

    public function setLesson(Lesson $lesson): static
    {
        // set the owning side of the relation if necessary
        if ($lesson->getSheet() !== $this) {
            $lesson->setSheet($this);
        }

        $this->lesson = $lesson;

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

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }
}