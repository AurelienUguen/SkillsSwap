<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use ApiPlatform\Metadata as Api;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[Api\ApiResource(
    normalizationContext:['groups' => ['read_category']],
    denormalizationContext:['groups' => ['create_category']],
    operations:[
        new Api\GetCollection(),
        new Api\Post(),
        new Api\Get(),
        new Api\Put(),
        new Api\Delete()
    ]
)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read_category'])]
    #[Api\ApiProperty(identifier:false)]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_category', 'read_sheet', 'create_category'])]
    private ?string $name = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'categories')]
    #[Groups(['read_category', 'create_category'])]
    private ?self $parent = null;

    #[ORM\OneToMany(mappedBy: 'parent', targetEntity: self::class)]
    #[Groups(['read_category', 'create_category'])]
    private Collection $categories;

    #[ORM\Column(length: 255)]
    #[Gedmo\Slug(fields:['name'])]
    #[Groups(['read_category'])]
    #[Api\ApiProperty(identifier:true)]
    private ?string $slug = null;

    #[ORM\Column]
    #[Groups(['read_category'])]
    private ?bool $isParent = null;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Sheet::class)]
    private Collection $sheets;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->sheets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getParent(): ?self
    {
        return $this->parent;
    }

    public function setParent(?self $parent): static
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(self $category): static
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
            $category->setParent($this);
        }

        return $this;
    }

    public function removeCategory(self $category): static
    {
        if ($this->categories->removeElement($category)) {
            // set the owning side to null (unless already changed)
            if ($category->getParent() === $this) {
                $category->setParent(null);
            }
        }

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(?string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }

    public function isIsParent(): ?bool
    {
        return $this->isParent;
    }

    public function setIsParent(bool $isParent): static
    {
        $this->isParent = $isParent;

        return $this;
    }

    /**
     * @return Collection<int, Sheet>
     */
    public function getSheets(): Collection
    {
        return $this->sheets;
    }

    public function addSheet(Sheet $sheet): static
    {
        if (!$this->sheets->contains($sheet)) {
            $this->sheets->add($sheet);
            $sheet->setCategory($this);
        }

        return $this;
    }

    public function removeSheet(Sheet $sheet): static
    {
        if ($this->sheets->removeElement($sheet)) {
            // set the owning side to null (unless already changed)
            if ($sheet->getCategory() === $this) {
                $sheet->setCategory(null);
            }
        }

        return $this;
    }
}
