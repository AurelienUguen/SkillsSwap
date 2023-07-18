<?php

namespace App\Entity;

use App\Repository\LanguageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata as Api;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LanguageRepository::class)]
#[Api\ApiResource(
    normalizationContext:['groups' => ['read_lang']],
    denormalizationContext:['groups' => ['create_lang']],
    operations:[
        new Api\GetCollection(),
        new Api\Post(),
        new Api\Get(),
        new Api\Put(),
        new Api\Delete()
    ]
)]
class Language
{

    use TimestampableEntity;
    
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read_lang', 'read_sheet'])]
    #[Api\ApiProperty(identifier:false)]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_lang', 'read_sheet', 'create_sheet'])]
    private ?string $name = null;

    #[ORM\ManyToMany(targetEntity: Sheet::class, mappedBy: 'language')]
    #[Groups(['read_lang'])]
    private Collection $sheets;

    #[ORM\Column(length: 255)]
    #[Gedmo\Slug(fields:['name'])]
    #[Api\ApiProperty(identifier:true)]
    #[Groups(['read_lang','read_sheet'])]
    private ?string $slug = null;

    public function __construct()
    {
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
            $sheet->addLanguage($this);
        }

        return $this;
    }

    public function removeSheet(Sheet $sheet): static
    {
        if ($this->sheets->removeElement($sheet)) {
            $sheet->removeLanguage($this);
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
}
